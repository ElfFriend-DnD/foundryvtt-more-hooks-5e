import Actor5e from '../../../../systems/dnd5e/module/actor/entity.js'
import { AsyncFunction, MODULE_TITLE } from "../const.js";
import { jankyPatch } from "../util.js";


const preRollHitDiePatch = `
const rollConfig = {
  event: new Event("hitDie"),
  parts,
  data: foundry.utils.deepClone(this.data.data),
  title,
  allowCritical: false,
  fastForward: !dialog,
  dialogOptions: {width: 350},
  messageData: {
    speaker: ChatMessage.getSpeaker({actor: this}),
    "flags.dnd5e.roll": {type: "hitDie"}
  }
};

if (this instanceof CONFIG.Actor.documentClass && !!rollConfig) {
  const allowed = Hooks.call('Actor5e.preRollHitDie', this, rollConfig);
  if ( allowed === false ) return this;
}

// Call the roll helper utility
const roll = await game.dnd5e.dice.damageRoll(rollConfig);
`;

const postRollHitDiePatch = `
if (this instanceof CONFIG.Actor.documentClass && roll !== undefined) {
  Hooks.callAll('Actor5e.rollHitDie', this, roll);
}
return roll;
`

const firstLineString = "rollHitDie(denomination, {dialog=true}={}) {\n";

export function jankyPatchRollHitDie() {
  try {
    const withPreHook = jankyPatch(Actor5e.prototype.rollHitDie.toString(), {
      firstLineString,
      regex: /const (rollD|d)ata(\s|.)+?\}\);/, //TODO: This supports both 1.6.x and 1.5.x dnd5e
      patch: preRollHitDiePatch,
    });
  
    const withPreHookFn = new AsyncFunction("denomination", "{dialog=true}={}", withPreHook);

    const withPreAndPostHook = jankyPatch(withPreHookFn.toString(), {
      firstLineString: ") {\n",
      regex: /return roll;/,
      patch: postRollHitDiePatch,
    });

    Actor5e.prototype.rollHitDie =  new AsyncFunction("denomination", "{dialog=true}={}", withPreAndPostHook);


  } catch(err) {
    console.error(MODULE_TITLE, '|', `There was an error patching "rollHitDie":`, err, 'Original Function was not replaced.');
  }
}

/**
 * A hook event that fires before an Actor rolls a hit die.
 * @param {Actor5e} actor       The Actor that rolled a hitDie
 * @param {object} rollData           The rolldata being provided to the DamageRoll instance
 */
 function preRollHitDie() { }

/**
 * A hook event that fires after an Actor has healed from a hit die roll.
 * @param {Actor5e} actor       The Actor that took the damage
 * @param {DamageRoll} roll           The resulting roll from the hit die
 */
function rollHitDie() { }
