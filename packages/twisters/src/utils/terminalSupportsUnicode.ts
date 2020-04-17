/**
 * The default command prompt and PowerShell in Windows do not support Unicode characters.
 * However, the VS Code integrated terminal and the Windows Terminal both do,
 * so this function takes the TERM_PROGRAM and WT_SESSION environment variables into account.
 * @remarks This implementation was extracted from [spinnies](https://github.com/jcarpanelli/spinnies) (MIT).
 */
export function terminalSupportsUnicode(): boolean {
  return (
    process.platform !== 'win32' ||
    process.env.TERM_PROGRAM === 'vscode' ||
    !!process.env.WT_SESSION
  );
}

export default terminalSupportsUnicode;
