import { TankPacket, Variant } from "growtopia.js";
import { Action } from "../abstracts/Action";
import { BaseServer } from "../structures/BaseServer";
import { Peer } from "../structures/Peer";
import { ActionType } from "../types/action";

export default class extends Action {
  constructor() {
    super();
    this.config = {
      eventName: "join_request"
    };
  }

  public handle(
    base: BaseServer,
    peer: Peer,
    action: ActionType<{ action: string; name: string }>
  ): void {
    const worldName: string = action.name || "";
    if (worldName.length <= 0) {
      return peer.send(
        Variant.from("OnFailedToEnterWorld", 1),
        Variant.from("OnConsoleMessage", "That world name is uhh `9empty``")
      );
    }
    if (worldName.match(/\W+|_|EXIT/gi)) {
      return peer.send(
        Variant.from("OnFailedToEnterWorld", 1),
        Variant.from("OnConsoleMessage", "That world name is too `9special`` to be entered.")
      );
    }

    setTimeout(() => {
      peer.enterWorld(worldName.toUpperCase());
    }, 300);
  }
}
