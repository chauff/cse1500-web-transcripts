# Web Technology Course Materials

This repository contains the web technology course materials for the CSE1500 Web and Database Technology course at TU Delft.

The course page can be found at https://chauff.github.io/Web-Teaching/.

## Contributors

Creating such transcripts is not the job for a single person, but a group effort! All contributors to this repository can be found on the [Contributors](https://github.com/chauff/Web-Teaching/graphs/contributors) tab!

## Related repositories

- [CSE1500 demo game](https://github.com/chauff/balloons-game)
- [CSE1500 code examples](https://github.com/chauff/demo-code)
- [CSE1500 website theme](https://github.com/chauff/cse-theme/)

# Setup Notes

Two Visual Studio Code extensions are important for this setup to remain efficient: [Markdown PDF](https://marketplace.visualstudio.com/items?itemName=yzane.markdown-pdf) (to generate PDFs of the lectures and assignments) and [Markdown All In One](https://github.com/yzhang-gh/vscode-markdown) to automatically create/update table of contents.

The PDFs are no longer available on GitHub (in order to limit the repository's size). They are available on Brightspace. They can also be generated with the Markdown PDF Visual Studio Code extension.

The transcripts are written in US English.

GitHub Actions workflow: after a manual trigger (head to the Actions tab to trigger) or on a weekly basis, all links are extracted from the Markdown files in this repo (except README.md) and their returned status code is recorded. Anything beyond a status code 400 should be checked. The report resides as artifact on the Actions tab and is called `urlCheck`. 

