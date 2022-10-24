import { useLazyQuery, useQuery } from "@apollo/client";
import {
  Avatar,
  Card,
  Heading,
  Page,
  ResourceItem,
  ResourceList,
  TextStyle,
} from "@shopify/polaris";
import React from "react";
import { AddBookModal, Layer } from "../components";
import useToggle from "../hooks/useToggle";
import { GET_BOOKS } from "../queries/AuthorBookQueries";

export default function BooksPage() {
  return (
    <Layer title="Author page">
      <Page title="Author page"></Page>
    </Layer>
  );
}
