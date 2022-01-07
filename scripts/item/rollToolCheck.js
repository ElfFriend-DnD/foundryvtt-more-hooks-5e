import { MODULE_NAME } from "../const.js";
export function patchRollToolCheck() {
  libWrapper.register(MODULE_NAME, 'CONFIG.Item.documentClass.prototype.rollToolCheck', rollToolCheckPatch, "WRAPPER");
}

async function rollToolCheckPatch(wrapper, options, ...rest) {
  const result = await wrapper(options, ...rest);

  if (!result) return result;

  const item = this;
  const actor = this.actor;

  Hooks.callAll('Item5e.rollToolCheck', item, result, options, actor);

  return result;
}

/**
 * A hook event that fires after an Item rolls a Tool Check
 * @param {Item5e} item       The Item that rolls the Tool Check
 * @param {D20Roll} result           The Result of the Tool Check Roll
 * @param {object} [options]      Roll options which were provided to the d20Roll function
 * @param {Actor5e} [actor]       The Actor that owns the item
 */
function rollToolCheck() { }
