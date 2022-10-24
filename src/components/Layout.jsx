import React, { useState, useCallback, useEffect } from "react";
import {
  Frame,
  TopBar,
  Button,
  ActionList,
  Popover,
  Avatar,
} from "@shopify/polaris";
import { LogOutMinor } from "@shopify/polaris-icons";
import Sidebar from "./Sidebar";
import useToggle from "../hooks/useToggle";

export default function Layer({ children, title = "" }) {
  const [active, toggleActivePopover] = useToggle(false);

  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);

  useEffect(() => {
    document.title = title || "GraphQL";
    return () => null;
  }, [title]);

  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive
      ),
    []
  );

  const activator = (
    <Button
      onClick={toggleActivePopover}
      size="slim"
      icon={<Avatar initials={"AA"} />}
    >
      {`ADMIN`}
    </Button>
  );

  const userMenuMarkup = (
    <div className="TopBarActions">
      <Popover
        active={active}
        activator={activator}
        onClose={toggleActivePopover}
        fluidContent
      >
        <Popover.Pane fixed>
          <ActionList
            sections={[
              {
                title: "",
                items: [
                  {
                    content: "Cerrar sesión",
                    icon: LogOutMinor,
                    onAction: () => {},
                  },
                ],
              },
            ]}
          />
        </Popover.Pane>
      </Popover>
    </div>
  );

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      onNavigationToggle={toggleMobileNavigationActive}
    />
  );

  return (
    <Frame
      topBar={topBarMarkup}
      navigation={<Sidebar />}
      showMobileNavigation={mobileNavigationActive}
      onNavigationDismiss={toggleMobileNavigationActive}
    >
      {children}
    </Frame>
  );
}
