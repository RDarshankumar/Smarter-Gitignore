import * as vscode from 'vscode';

export class NotificationProvider {
  showSuccess(message: string, ...actions: string[]): Thenable<string | undefined> {
    return vscode.window.showInformationMessage(
      `Smart GitIgnore: ${message}`,
      ...actions
    );
  }

  showWarning(message: string, ...actions: string[]): Thenable<string | undefined> {
    return vscode.window.showWarningMessage(
      `Smart GitIgnore: ${message}`,
      ...actions
    );
  }

  showError(message: string, ...actions: string[]): Thenable<string | undefined> {
    return vscode.window.showErrorMessage(
      `Smart GitIgnore: ${message}`,
      ...actions
    );
  }

  async showProgress<T>(
    title: string,
    task: (progress: vscode.Progress<{ message?: string; increment?: number }>) => Promise<T>
  ): Promise<T> {
    return vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: `Smart GitIgnore: ${title}`,
        cancellable: false,
      },
      task
    );
  }

  async showPreview(content: string, title = 'Preview: .gitignore'): Promise<void> {
    const doc = await vscode.workspace.openTextDocument({
      content,
      language: 'ignore',
    });
    await vscode.window.showTextDocument(doc, {
      preview: true,
      viewColumn: vscode.ViewColumn.Beside,
    });
  }

  async showAnalysis(technologies: string[]): Promise<void> {
    if (technologies.length === 0) {
      await vscode.window.showInformationMessage(
        'Smart GitIgnore: No technologies detected. Using common rules only.'
      );
      return;
    }

    const message = `Detected technologies: ${technologies.join(', ')}`;
    await vscode.window.showInformationMessage(`Smart GitIgnore: ${message}`);
  }
}
