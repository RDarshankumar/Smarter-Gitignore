import * as vscode from 'vscode';
import { FileScanner, ScanResult } from './fileScanner';
import { FolderScanner, FolderScanResult } from './folderScanner';
import { DetectionResult, IDetector } from '../detector/technologyDetector';
import { NodeDetector } from '../detector/nodeDetector';
import { ReactDetector } from '../detector/reactDetector';
import { NextDetector } from '../detector/nextDetector';
import { AngularDetector } from '../detector/angularDetector';
import { VueDetector } from '../detector/vueDetector';
import { FlutterDetector } from '../detector/flutterDetector';
import { LaravelDetector } from '../detector/laravelDetector';
import { PythonDetector } from '../detector/pythonDetector';
import { JavaDetector } from '../detector/javaDetector';
import { GoDetector } from '../detector/goDetector';
import { RustDetector } from '../detector/rustDetector';
import { DotnetDetector } from '../detector/dotnetDetector';
import { DockerDetector } from '../detector/dockerDetector';
import { Logger } from '../utils/logger';

export interface WorkspaceScanResult {
  workspaceRoot: string;
  detectedTechnologies: DetectionResult[];
  scanResult: ScanResult;
  folderResult: FolderScanResult;
}

export class WorkspaceScanner {
  private fileScanner = new FileScanner();
  private folderScanner = new FolderScanner();
  private detectors: IDetector[] = [
    new NodeDetector(),
    new ReactDetector(),
    new NextDetector(),
    new AngularDetector(),
    new VueDetector(),
    new FlutterDetector(),
    new LaravelDetector(),
    new PythonDetector(),
    new JavaDetector(),
    new GoDetector(),
    new RustDetector(),
    new DotnetDetector(),
    new DockerDetector(),
  ];

  async scan(workspaceRoot: string): Promise<WorkspaceScanResult> {
    Logger.info(`Starting workspace scan: ${workspaceRoot}`);

    const [scanResult, folderResult] = await Promise.all([
      this.fileScanner.scan(workspaceRoot),
      this.folderScanner.scan(workspaceRoot),
    ]);

    const detectionPromises = this.detectors.map(d =>
      d.detect(scanResult.allFiles, workspaceRoot)
    );
    const allResults = await Promise.all(detectionPromises);
    const detectedTechnologies = allResults.filter(r => r.detected);

    Logger.info(`Detected technologies: ${detectedTechnologies.map(t => t.technology).join(', ')}`);

    return {
      workspaceRoot,
      detectedTechnologies,
      scanResult,
      folderResult,
    };
  }

  getWorkspaceRoot(): string | undefined {
    const folders = vscode.workspace.workspaceFolders;
    return folders && folders.length > 0 ? folders[0].uri.fsPath : undefined;
  }
}
