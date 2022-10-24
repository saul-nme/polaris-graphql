import React from "react";
import { Navigation } from "@shopify/polaris";
import { CustomersMajor, VocabularyMajor } from "@shopify/polaris-icons";
import { useLocation } from "react-router-dom";

export default function Sidebar() {
  const { pathname } = useLocation();

  const routes = [
    {
      label: "Authors",
      icon: CustomersMajor,
      url: "/authors",
      selected: ["/authors"].indexOf(pathname) >= 0,
      can: "Inicio",
      subNavigationItems: [],
    },
    {
      label: "Books",
      icon: VocabularyMajor,
      url: "/books",
      selected: ["/books"].indexOf(pathname) >= 0,
      can: "Inicio",
      subNavigationItems: [],
    },
  ];

  return (
    <Navigation location="/">
      <Navigation.Section items={routes} />
    </Navigation>
  );
}
