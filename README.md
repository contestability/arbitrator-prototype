# Automated Arbitrator Prototype for Contesting Dialogues

The automated arbitrator is a prototype system for arbitrating contesting dialogues, built on top of Prudens argumentation-based reasoning engine.

## GitHub Pages Deployment

This repository uses GitHub Actions to automatically deploy to GitHub Pages from the `main` branch.

### Setup Instructions

To enable automatic deployment to GitHub Pages:

1. Go to your repository settings on GitHub
2. Navigate to **Settings** > **Pages**
3. Under **Build and deployment**:
   - Set **Source** to "GitHub Actions"
   - The workflow will automatically deploy when changes are pushed to the `main` branch

### Manual Deployment

You can also manually trigger a deployment:

1. Go to the **Actions** tab in your repository
2. Select the "Deploy to GitHub Pages" workflow
3. Click "Run workflow" and select the `main` branch

## Local Development

Open `index.html` in a web browser to view the application locally.

## License

MIT License - See [LICENSE](LICENSE) file for details.
