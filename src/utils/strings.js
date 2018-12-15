const trim = (strings)=> strings.map((str)=> str.replace(/\n\s*/g, ''));

/**
 * Template tag to turn a multi-line template-string into a single line.
 *
 * example:
 * ```
 * console.log(
 *   singleLine`foo ${123}
 *     spam ham shrub`
 * )
 *
 * > 'foo 123 spam ham shrub'
 * ```
 */
export const singleLine = (strings, ...parts)=> (
  String.raw({raw: trim(strings.raw)}, ...parts).replace(/\n\s*/g, '')
);


export const lineBreaksToSpaces = (raw, ...parts)=> (
  String.raw({raw}, ...parts).replace(/\n\s*/g, ' ')
);
