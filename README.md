HIV-TRACE is an application that identifies potential transmission
clusters within a supplied FASTA file with an option to find
potential links against the Los Alamos HIV Sequence Database.

## Installation



## System Dependencies

Nothing!

# Usage

## Example

`hivtrace -i ./INPUT.FASTA -a resolve -r HXB2_prrt -t .015 -m 500 -g .05 -c`

# Options Summary

## -i --input

A FASTA file, with **nucleotide** sequences to be analyzed. Each sequence will
be aligned to the chosen reference sequence prior to network inference.
Sequence names may include munged attributes,
e.g. ISOLATE_XYZ|2005|SAN DIEGO|MSM

## -a --ambiguities

Handle ambiguious nucleotides using one of the following specified strategies.

| Option    | Description                                                                  |
| --------- | --------------                                                               |
| resolve   | count any resolutions that match as a perfect match                          |
| average   | average all possible resolutions                                             |
| skip      | skip all positions with ambiguities                                          |
| gapmm     | count character-gap positions as 4-way mismatches, otherwise same as average |

For more details, please see the the [MBE paper](http://mbe.oxfordjournals.org/content/22/5/1208.short).

## -r --reference

The sequence that will be used to align all provided sequences to. It is assumed that
the input sequences are in fact homologous to the reference and do not have too
much indel variation.

| Option               | Description                     |
| ---------            | --------------                  |
| HXB2_vif             |                                 |
| HXB2_vpu             |                                 |
| HXB2_int             |                                 |
| HXB2_vpr             |                                 |
| HXB2_pr              |                                 |
| HXB2_pol             |                                 |
| HXB2_tat             |                                 |
| HXB2_rt              |                                 |
| NL4-3_prrt           |                                 |
| HXB2_prrt            |                                 |
| HXB2_nef             |                                 |
| HXB2_gag             |                                 |
| HXB2_env             |                                 |
| HXB2_rev             |                                 |
| Path/to/FASTA/file   | Path to a custom reference file |

Please reference the [landmarks of the HIV-1 genome](http://www.hiv.lanl.gov/content/sequence/HIV/MAP/landmark.html)
if the presets seem foreign to you.

## -t --threshold

Two sequences will be connected with a putative link (subject to filtering, see
below), if and only if their pairwise distance does not exceed this threshold.

## -m --minoverlap

Only sequences who overlap by at least this many non-gap characters will be
included in distance calculations. Be sure to adjust this based on the length
of the input sequences. You should aim to have at least 2/(distance threshold)
aligned characters.

## -g --fraction

Affects _only_ the **Resolve** option for handling ambiguities.
Any sequence with no more than the selected proportion [0 - 1] will have its
ambiguities resolved (if possible), and ambiguities in sequences with higher
fractions of them will be averaged. This mitigates spurious linkages due to
highly ambiguous sequences.

## -u --curate

Screen for contaminants by marking or removing sequences that cluster with any
of the contaminant IDs.

| Option     | Description                                                     |
| ---------  | --------------                                                  |
| remove     | Remove spurious edges from the inferred network                 |
| report     | Flag all sequences sharing a cluster with the reference         |
| separately | Flag all sequences and report them via secondary tn93 command   |
| none       | Do nothing                                                      |



## -f --filter

Use a phylogenetic test of conditional independence on each triangle in the
network to remove spurious _transitive_ connections which make
A->B->C chains look like A-B-C triangles.

## -s --strip_drams

Masks known DRAMs (Drug Resistance-Associated Mutation) positions from provided
sequences.

| Option      | Description                                                                                                                                      |
| ----------- | --------------                                                                                                                                   |
| `lewis`     | Mask (with ---) the list of codon sites defined in [Lewis et al](http://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.0050050). |
| `wheeler`   | Mask (with ---) the list of codon sites defined in [Wheeler et al](http://www.ncbi.nlm.nih.gov/pubmed/20395786).                                 |

## -c --compare

Compare uploaded sequences to all public sequences. Retrieved periodically from
the [Los Alamos HIV Sequence Database](http://hiv.lanl.gov)

# Viewing JSON files
Visit https://veg.github.io/hivtrace-viz/ and click `Load File`.

# Repository Template
This Github organization was created for use by [CDC](http://www.cdc.gov)
programs to collaborate on public health surveillance related projects in
support of the [CDC Surveillance Strategy](http://www.cdc.gov/surveillance).
This third party web application is not hosted by the CDC, but is used by CDC
and its partners to share information and collaborate on software.

This repository serves as a template for other repositories to follow in order
to provide the appropriate notices for users in regards to privacy protection,
contribution, licensing, copyright, records management and collaboration.

## Public Domain
This project constitutes a work of the United States Government and is not
subject to domestic copyright protection under 17 USC § 105. This project is in
the public domain within the United States, and copyright and related rights in
the work worldwide are waived through the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).
All contributions to this project will be released under the CC0 dedication. By
submitting a pull request you are agreeing to comply with this waiver of
copyright interest.

## License
The project utilizes code licensed under the terms of the Apache Software
License and therefore is licensed under ASL v2 or later.

This program is free software: you can redistribute it and/or modify it under
the terms of the Apache Software License version 2, or (at your option) any
later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the Apache Software License for more details.

You should have received a copy of the Apache Software License along with this
program. If not, see http://www.apache.org/licenses/LICENSE-2.0.html

## Privacy
This project contains only non-sensitive, publicly available data and
information. All material and community participation is covered by the
Surveillance Platform [Disclaimer](https://github.com/CDCgov/template/blob/master/DISCLAIMER.md)
and [Code of Conduct](https://github.com/CDCgov/template/blob/master/code-of-conduct.md).
For more information about CDC's privacy policy, please visit [http://www.cdc.gov/privacy.html](http://www.cdc.gov/privacy.html).

## Contributing
Anyone is encouraged to contribute to the project by [forking](https://help.github.com/articles/fork-a-repo)
and submitting a pull request. (If you are new to GitHub, you might start with a
[basic tutorial](https://help.github.com/articles/set-up-git).) By contributing
to this project, you grant a world-wide, royalty-free, perpetual, irrevocable,
non-exclusive, transferable license to all users under the terms of the
[Apache Software License v2](http://www.apache.org/licenses/LICENSE-2.0.html) or
later.

All comments, messages, pull requests, and other submissions received through
CDC including this GitHub page are subject to the [Presidential Records Act](http://www.archives.gov/about/laws/presidential-records.html)
and may be archived. Learn more at [http://www.cdc.gov/other/privacy.html](http://www.cdc.gov/other/privacy.html).

## Records
This project is not a source of government records, but is a copy to increase
collaboration and collaborative potential. All government records will be
published through the [CDC web site](http://www.cdc.gov).

## Notices
Please refer to [CDC's Template Repository](https://github.com/CDCgov/template)
for more information about [contributing to this repository](https://github.com/CDCgov/template/blob/master/CONTRIBUTING.md),
[public domain notices and disclaimers](https://github.com/CDCgov/template/blob/master/DISCLAIMER.md),
and [code of conduct](https://github.com/CDCgov/template/blob/master/code-of-conduct.md).

## Hat-tips
Thanks to [18F](https://18f.gsa.gov/)'s [open source policy](https://github.com/18F/open-source-policy)
and [code of conduct](https://github.com/CDCgov/code-of-conduct/blob/master/code-of-conduct.md)
that were very useful in setting up this GitHub organization. Thanks to CDC's
[Informatics Innovation Unit](https://www.phiresearchlab.org/index.php/code-of-conduct/)
that was helpful in modeling the code of conduct.
