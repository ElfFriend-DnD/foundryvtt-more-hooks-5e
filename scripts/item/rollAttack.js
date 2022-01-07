import { MODULE_NAME } from "../const.js";

export function patchRollAttack() {
  libWrapper.register(MODULE_NAME, 'CONFIG.Item.documentClass.prototype.rollAttack', rollAttackPatch, "WRAPPER");
}

async function rollAttackPatch(wrapper, options, ...rest) {
  const result = await wrapper(options, ...rest);

  if (!result) return result;

  const item = this;
  const actor = this.actor;

  Hooks.callAll('Item5e.rollAttack', item, result, options, actor);

  return result;
}

/**
 * A hook event that fires after an Item rolls an Attack Roll
 * @param {Item5e} item       The Item that rolls the Attack Roll
 * @param {D20Roll} result           The Result of the Attack Roll
 * @param {object} [options]      Roll options which were provided to the d20Roll function
 * @param {Actor5e} [actor]       The Actor that owns the item
 */
function rollAttack() { }
