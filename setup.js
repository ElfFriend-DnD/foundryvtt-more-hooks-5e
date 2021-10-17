import { MODULE_TITLE, MODULE_NAME } from "./scripts/const.js";
import { patchRollAbilitySave, rollAbilitySave } from './scripts/actor/rollAbilitySave.js'
import { patchRollAbilityTest, rollAbilityTest } from './scripts/actor/rollAbilityTest.js'
import { patchRollDeathSave, rollDeathSave } from './scripts/actor/rollDeathSave.js'
import { patchRollSkill, rollSkill } from './scripts/actor/rollSkill.js'
import { patchRollDamage, rollDamage } from './scripts/item/damageRoll.js'
import { patchRoll, roll } from './scripts/item/roll.js'
import { patchRollAttack, rollAttack } from './scripts/item/rollAttack.js'
import { patchRollFormula, rollFormula } from './scripts/item/rollFormula.js'
import { patchRollRecharge, rollRecharge } from './scripts/item/rollRecharge.js'
import { patchRollToolCheck, rollToolCheck } from './scripts/item/rollToolCheck.js'

export let socket;

Hooks.on("setup", () => {
  console.log(`${MODULE_NAME} | Initializing ${MODULE_TITLE}`);
  // actor sockets
  patchRollAbilitySave();
  patchRollAbilityTest();
  patchRollDeathSave();
  patchRollSkill();

  // item sockets
  patchRollDamage();
  patchRoll();
  patchRollAttack();
  patchRollFormula();
  patchRollRecharge();
  patchRollToolCheck();
});

Hooks.once('socketlib.ready', () => {
  socket = socketlib.registerModule(MODULE_NAME);

  // actor hooks
  socket.register('rollAbilitySave', rollAbilitySave);
  socket.register('rollAbilityTest', rollAbilityTest);
  socket.register('rollDeathSave', rollDeathSave);
  socket.register('rollSkill', rollSkill);

  // item hooks
  socket.register('rollDamage', rollDamage);
  socket.register('roll', roll);
  socket.register('rollAttack', rollAttack);
  socket.register('rollFormula', rollFormula);
  socket.register('rollRecharge', rollRecharge);
  socket.register('rollToolCheck', rollToolCheck);
})