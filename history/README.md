# Battery Atlas Git history backup

The complete original Git history is preserved in 10 binary parts because the upload connector rejects the approximately 29 MB bundle as one request.

From the repository root:

```sh
python history/restore-bundle.py
git bundle verify history/battery-atlas.bundle
```

The script reconstructs the exact bundle and checks SHA-256: `5d62cc42d782adbfcb5dad4bca9632e9b92d083382d1da3e7a405de6f8dc72b8`.

Original source commit: `cf84630d45c96feb6b722148b9d0fac9e0397aaf`.

The original `site-archive.zip` is retained byte-for-byte; its original compressed stream fails archive validation. The `dist/` tree and Git history backup are available independently.
