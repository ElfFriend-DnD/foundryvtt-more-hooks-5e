import { MODULE_NAME } from "../const.js";

export function patchRollDeathSave() {
  libWrapper.register(MODULE_NAME, 'CONFIG.Actor.documentClass.prototype.rollDeathSave', rollDeathSavePatch, "WRAPPER");
}

async function rollDeathSavePatch(wrapper, options, ...rest) {
  const result = await wrapper(options, ...rest);

  const actor = this;

  Hooks.callAll('Actor5e.rollDeathSave', actor, result, options);

  return result;
}

/**
 * A hook event that fires after an Actor rolls a Ability Save
 * @param {Actor5e} actor       The Actor that rolled the death save
 * @param {D20Roll} result           The Result of the death save
 * @param {object} options      Options which configured how the death save was rolled
 */
export async function rollDeathSave() { }
