"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
} from "@/app/_components/ui/menubar";

import { signOut } from "next-auth/react";

const SettingsBtn = () => {
  return (
    <Menubar className="p-0">
      <MenubarMenu>
        <MenubarTrigger asChild>
          <Button variant="default">Настройки</Button>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Настройки профиля</MenubarItem>
          {/* <MenubarItem>
            New Window <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>New Incognito Window</MenubarItem> */}
          {/* <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Share</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Email link</MenubarItem>
              <MenubarItem>Messages</MenubarItem>
              <MenubarItem>Notes</MenubarItem>
            </MenubarSubContent>
          </MenubarSub> */}
          <MenubarSeparator />
          <MenubarItem onClick={() => signOut()}>
            <span className="text-red-500">Выход</span>
            {/* <MenubarShortcut></MenubarShortcut> */}
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default SettingsBtn;
