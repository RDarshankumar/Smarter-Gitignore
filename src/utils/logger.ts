import * as vscode from 'vscode';
import { EXTENSION_NAME } from './constants';

export class Logger {
  private static outputChannel: vscode.OutputChannel;

  static initialize(): void {
    this.outputChannel = vscode.window.createOutputChannel(EXTENSION_NAME);
  }

  static info(message: string): void {
    const timestamp = new Date().toISOString();
    this.outputChannel?.appendLine(`[${timestamp}] [INFO] ${message}`);
  }

  static warn(message: string): void {
    const timestamp = new Date().toISOString();
    this.outputChannel?.appendLine(`[${timestamp}] [WARN] ${message}`);
  }

  static error(message: string, error?: Error): void {
    const timestamp = new Date().toISOString();
    this.outputChannel?.appendLine(`[${timestamp}] [ERROR] ${message}`);
    if (error) {
      this.outputChannel?.appendLine(`  Stack: ${error.stack}`);
    }
  }

  static debug(message: string): void {
    const timestamp = new Date().toISOString();
    this.outputChannel?.appendLine(`[${timestamp}] [DEBUG] ${message}`);
  }

  static show(): void {
    this.outputChannel?.show();
  }

  static dispose(): void {
    this.outputChannel?.dispose();
  }
}
