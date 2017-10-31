#!/usr/bin/env node

'use strict';

const program  = require('commander');
const fs       = require('fs');
const hivtrace = require('./hivtrace.js');

const manifest = JSON.parse(fs.readFileSync('package.json'));

program
  .version(manifest.version)
  .option('-i, --input [path]', 'A FASTA file, with nucleotide sequences to be analyzed. Each sequence will be aligned to the chosen reference sequence prior to network inference. Sequence names may include munged attributes, e.g. ISOLATE_XYZ|2005|SAN DIEGO|MSM', './INPUT.FASTA')
  .option('-a, --ambiguities', 'Handle ambiguious nucleotides using one of the following specified strategies: resolve, average, skip, gapmm', 'skip')
  .option('-r, --reference', 'The sequence that will be used to align all provided sequences to. It is assumed that the input sequences are in fact homologous to the reference and do not have too much indel variation.', 'HXB2_pol')
  .option('-t, --threshold', 'Two sequences will be connected with a putative link (subject to filtering, see below), if and only if their pairwise distance does not exceed this threshold.', 0.015)
  .option('-m, --minoverlap', 'Only sequences who overlap by at least this many non-gap characters will be included in distance calculations. Be sure to adjust this based on the length of the input sequences. You should aim to have at least 2/(distance threshold) aligned characters.', 500)
  .option('-g, --fraction', 'Affects only the Resolve option for handling ambiguities. Any sequence with no more than the selected proportion [0 - 1] will have its ambiguities resolved (if possible), and ambiguities in sequences with higher fractions of them will be averaged. This mitigates spurious linkages due to highly ambiguous sequences.')
  .option('-u, --curate', 'Screen for contaminants by marking or removing sequences that cluster with any of the contaminant IDs.')
  .option('-f, --filter', 'Use a phylogenetic test of conditional independence on each triangle in the network to remove spurious transitive connections which make A->B->C chains look like A-B-C triangles.')
  .option('-s, --strip_drams', 'Masks known DRAMs (Drug Resistance-Associated Mutation) positions from provided sequences.')
  .option('-c, --compare', 'Compare uploaded sequences to all public sequences. Retrieved periodically from the Los Alamos HIV Sequence Database.')
  .parse(process.argv);

const output = hivtrace(program);
console.log(output);
