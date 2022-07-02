/**
 * A janky patching utility meant to allow insertion of additional code into an existing function via regex search and replace.
 * This was cobbled together after looking at Moerill's MESS and manuelVo's Drag Ruler monkeypatching code.
 * I added some additional attempts at safety and sanity checking.
 * 
 * You should not use this, you should use libwrapper.
 * 
 * @param {*} originalFunctionReference 
 * @param {*} param1 
 */
export const jankyPatch = (stringifiedOriginal, {
  regex,
  patch,
  firstLineString, // the first line of the function, up to the opening '{'
}) => {
  if (!regex || !patch || !firstLineString || !stringifiedOriginal) {
    throw new Error('Missing information.')
  }

  // Replace CRLF with LF in case foundry.js has CRLF for some reason
  stringifiedOriginal = stringifiedOriginal.replace(/\r\n/g, "\n")

  if (stringifiedOriginal.indexOf(firstLineString) < 0) {
    throw new Error('First line not present in original.')
  }

  // slice to only the contents of the function
  stringifiedOriginal = stringifiedOriginal.slice(
    stringifiedOriginal.indexOf(firstLineString) + firstLineString.length,
    stringifiedOriginal.lastIndexOf("\n")
  );

  const regexToUse = new RegExp(regex);

  const hasMatch = regexToUse.test(stringifiedOriginal);

  if (!hasMatch) {
    throw new Error('The regex provided has no matches in the provided function.')
  }

  const defiledOriginalAsString = stringifiedOriginal.replace(regexToUse, patch);

  return defiledOriginalAsString;
}