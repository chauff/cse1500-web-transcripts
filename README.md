# Web Technology Course Materials

This repository contains the web technology course materials for the CSE1500 Web and Database Technology course at TU Delft.

The course page can be found at https://chauff.github.io/Web-Teaching/.

## Related repositories

- [CSE1500 demo game](https://github.com/chauff/demo-game)
- [CSE1500 code examples](https://github.com/chauff/demo-code)

# Setup Notes

Two Visual Studio Code extensions are important for this setup to remain efficient: Markdown PDF (to generate PDFs of the lectures and assignments) and Markdown All In One to automatically create/update table of contents.

The PDFs are no longer available on GitHub (to limit the repository's size). They are available on Brightspace. they can also be generated with the mentioned Markdown PDF Visual Studio Code extension.

GitHub Actions workflow: after a manual trigger (head to the Actions tab to trigger) or on a weekly basis, all links are extracted from the Markdown files in this repo (except README.md) and their returned status code is recorded. Anything beyond a status code 400 should be checked. The report resides as artifact on the Actions tab and is called `urlCheck`. 
