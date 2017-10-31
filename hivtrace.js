;
'use strict';

const fs       = require('fs');
const jetpack  = require('fs-jetpack');
const fasta    = require('fasta-parser');
const bioseq   = require('bioseq');
const tn93     = require('tn93');

const manifest = JSON.parse(fs.readFileSync('package.json'));

function defaultNode(override){
  return(Object.assign({
    id: '',
    index: -1,
    padding: 0,
    selected: false,
    seq: '',
    cluster: 1,
    visible: true
  }, override));
};

function hivtrace(program, communicator){
  let data = {
    nodes: [],
    links: [],
    distance_matrix: []
  };
  let reference = program.reference;
  let filesize = fs.statSync(program.input).size;
  let covered = 0;
  let index = 0;
  let parser = fasta().on('data', d => {
    let node = d.toString();
    covered += node.length;
    node = defaultNode(JSON.parse(node));
    let rst = bioseq.align(reference, node.seq, true, [1, -1], [-5, -1.7]);
    let fmt = bioseq.cigar2gaps(reference, node.seq, rst.position, rst.CIGAR);
    node.padding = rst.position;
    node.seq = fmt[1];
    node.index = index++;
    data.nodes.push(node);
  }).on('end', () => {
    let k = 0, minPadding = math.min(data.nodes, 'padding');
    data.nodes.forEach(d => d.seq = '-'.repeat(d.padding - minPadding) + d.seq);
    data.distance_matrix = Array(data.nodes.length);
    for(let i = 0; i < data.nodes.length; i++){
      data.distance_matrix[i] = math.repeat(0, data.nodes.length);
    }
    for(let i = 0; i < data.nodes.length; i++){
      for(let j = 0; j < i; j++){
        let dist = tn93(
          data.nodes[j]['seq'],
          data.nodes[i]['seq'],
          program.ambiguities
        );
        data.links.push({
          'index': k++,
          'source': data.nodes[j].id,
          'target': data.nodes[i].id,
          'visible': (dist < program.threshold),
          'selected': false,
          'distance': dist,
          'cluster': 1
        });
        data.distance_matrix[i][j] = data.distance_matrix[j][i] = dist;
      }
    }
  });
  parser.write(jetpack.read(program.input));
  parser.end();
  return data;
}

if(typeof exports !== 'undefined'){
  if(typeof module !== 'undefined' && module.exports){
    exports = module.exports = hivtrace;
  }
  exports.hivtrace = hivtrace;
} else {
  window.hivtrace = hivtrace;
}
