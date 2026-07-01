import * as vscode from 'vscode';

export class StatusBarProvider {
  private statusBarItem: vscode.StatusBarItem;

  constructor() {
    this.statusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Left,
      100
    );
    this.statusBarItem.command = 'smartGitIgnore.update';
    this.setReady();
    this.statusBarItem.show();
  }

  setReady(): void {
    this.statusBarItem.text = '$(check) GitIgnore Ready';
    this.statusBarItem.tooltip = 'Smart GitIgnore — Click to update .gitignore';
    this.statusBarItem.backgroundColor = undefined;
  }

  setScanning(): void {
    this.statusBarItem.text = '$(sync~spin) GitIgnore Scanning...';
    this.statusBarItem.tooltip = 'Smart GitIgnore — Scanning workspace';
  }

  setGenerating(): void {
    this.statusBarItem.text = '$(sync~spin) GitIgnore Generating...';
    this.statusBarItem.tooltip = 'Smart GitIgnore — Generating .gitignore';
  }

  setError(): void {
    this.statusBarItem.text = '$(error) GitIgnore Error';
    this.statusBarItem.tooltip = 'Smart GitIgnore — An error occurred. Click to retry.';
    this.statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.errorBackground');
  }

  dispose(): void {
    this.statusBarItem.dispose();
  }
}
