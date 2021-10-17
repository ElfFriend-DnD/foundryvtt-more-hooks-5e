
import { MODULE_NAME } from "../const.js";
import { socket } from '../../setup.js';
import { prepareOptions } from "../utils.js";

export function patchRollDeathSave() {
  libWrapper.register(MODULE_NAME, 'CONFIG.Actor.documentClass.prototype.rollDeathSave', rollDeathSavePatch, "WRAPPER");
}

async function rollDeathSavePatch(wrapper, options, ...rest) {
  const result = await wrapper(options, ...rest);

  const actorUuid = this.uuid;
  const cleanedOptions = prepareOptions(options);

  socket.executeForEveryone(rollDeathSave, actorUuid, result, cleanedOptions);

  return result;
}

export async function rollDeathSave(actorUuid, result, cleanedOptions) {
  const actorOrToken = await fromUuid(actorUuid);
  const actor = actorOrToken instanceof TokenDocument ? actorOrToken.actor : actorOrToken;

  const resultRoll = game.dnd5e.dice.D20Roll.fromData(result);

  /**
   * A hook event that fires after an Actor rolls a Ability Save
   * @function Actor5e.rollDeathSave
   * @memberof actorHooks
   * @param {Actor5e} actor       The Actor that rolled the death save
   * @param {D20Roll} result           The Result of the death save
   * @param {object} options      Options which configured how the death save was rolled
   */
  Hooks.callAll('Actor5e.rollDeathSave', actor, resultRoll, cleanedOptions);
}
