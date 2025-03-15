// Basic logger type
export type Logger = {
  log: Function;
  warn?: Function;
  error?: Function;
  debug?: Function;
}
