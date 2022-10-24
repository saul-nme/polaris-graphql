import { useMutation, useQuery } from "@apollo/client";
import { Card, FormLayout, Modal, Select, TextField } from "@shopify/polaris";
import React, { useState, useCallback } from "react";
import {
  CREATE_BOOK,
  GET_AUTHORS_NAME,
  GET_BOOKS,
} from "../queries/AuthorBookQueries";

export default function AddBookModal({ active = false, onClose = () => {} }) {
  const [{ title, pages, author, editorial, publishedAt }, setBookToSave] =
    useState({
      title: "",
      pages: "",
      author: "",
      editorial: "",
      publishedAt: "2022-10-18",
    });
  const { data: { getAuthors = [] } = {}, loading } =
    useQuery(GET_AUTHORS_NAME);

  const [createBook, { loading: isCreating }] = useMutation(CREATE_BOOK, {
    update: (cache, { data: { createBook } }) => {
      // Get data in cache to update
      const { getBooks } = cache.readQuery({
        query: GET_BOOKS,
      });
      // Rewrite the cache
      cache.writeQuery({
        query: GET_BOOKS,
        data: {
          getBooks: [...getBooks, createBook],
        },
      });
    },
  });

  const handleChange = useCallback((value, field) => {
    setBookToSave((prevState) => ({ ...prevState, [field]: value }));
  }, []);

  const handleSave = async () => {
    try {
      const { data } = await createBook({
        variables: {
          input: {
            title,
            pages: Number(pages),
            author,
            publishedAt,
            editorial,
          },
        },
      });

      onClose();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="Add book"
      open={active}
      onClose={onClose}
      primaryAction={{
        content: "Agregar",
        onAction: handleSave,
        disabled: !title || !author || isCreating,
        loading: isCreating,
      }}
      secondaryActions={[
        { content: "Cancelar", onAction: onClose, disabled: isCreating },
      ]}
    >
      <Card sectioned>
        <FormLayout>
          <TextField
            label="Title"
            placeholder="The hunger games"
            value={title}
            onChange={(value) => handleChange(value, "title")}
          />
          <TextField
            label="Pages"
            placeholder="399"
            value={pages}
            type="number"
            onChange={(value) => handleChange(value, "pages")}
          />
          <Select
            label="Author"
            placeholder="Select an author"
            value={author}
            options={
              loading
                ? []
                : getAuthors && getAuthors.length > 0
                ? getAuthors.map((i) => ({
                    label: `${i.firstName} ${i.lastName}`,
                    value: i._id,
                  }))
                : []
            }
            onChange={(value) => handleChange(value, "author")}
          />
          <TextField
            label="Published at"
            placeholder="30/10/2010"
            value={publishedAt}
            type="date"
            onChange={(value) => handleChange(value, "publishedAt")}
          />
          <TextField
            label="Editorial"
            placeholder="Santillana"
            value={editorial}
            onChange={(value) => handleChange(value, "editorial")}
          />
        </FormLayout>
      </Card>
    </Modal>
  );
}
