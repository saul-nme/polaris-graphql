import { useQuery } from "@apollo/client";
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
  /**
   * Use query es un hook de apollo que te permite usar las queries que se han programado en el servidor
   * el primer parámetro es el query que se quiere utilizar
   * lo que regresa el hook principalmente es un objeto con data, loading y error en caso de que exista uno
   * este hook te permite correr el query cuando carga la página
   */
  const { data, loading, error } = useQuery(GET_BOOKS);
  /**
   * Cuando se require realizar un query pero no se quiere que carge al inicio de la aplicación
   * sino hasta cuando el usuario lo desee se utiliza el hook useLazyQuery pero este en lugar
   * de regresar un objeto regresa un arreglo en donde el primer parámetro es una función tipo promesa
   * que se puede utilizar a lo largo de la aplicación, el segundo parámetro es un objeto con data, loading y error
   */
  // const [fetchData ,{ data, loading, error }] = useLazyQuery(GET_BOOKS);
  const [activeModal, toggleModal] = useToggle();

  console.log({ data, loading, error });

  return (
    <Layer title="Books page">
      <Page
        title="Books page"
        primaryAction={{ content: "Agregar", onAction: toggleModal }}
      >
        {activeModal && (
          <AddBookModal active={activeModal} onClose={toggleModal} />
        )}
        <Card sectioned>
          <Heading>Libros</Heading>
          <ResourceList
            loading={loading}
            items={data && data.getBooks ? data.getBooks : []}
            renderItem={({
              title = "",
              pages = 0,
              editorial = "",
              author = {},
              publishedAt = new Date(),
            }) => {
              const { firstName = "", lastName = "" } = author || {};
              const media = (
                <Avatar initials={title.slice(0, 2).toUpperCase()} />
              );
              return (
                <ResourceItem media={media} verticalAlignment="fill">
                  <div className="flex justify-between">
                    <div className="flex flex-col flex-1">
                      <div className="flex">
                        <TextStyle variation="strong">{title}</TextStyle>
                      </div>
                      <div className="flex">Pages: {pages}</div>
                      <TextStyle>
                        Published at: {` `}
                        {new Date(publishedAt).toLocaleDateString()}
                      </TextStyle>
                    </div>
                    <div className="flex flex-1">
                      <TextStyle>{editorial}</TextStyle>
                    </div>
                    <div className="flex items-start flex-1">
                      <Avatar
                        customer
                        initials={firstName.slice(0, 1) + lastName.slice(0, 1)}
                      />
                      <div className="mr-1" />
                      <TextStyle variation="strong">
                        {firstName} {lastName}
                      </TextStyle>
                    </div>
                  </div>
                </ResourceItem>
              );
            }}
          />
        </Card>
      </Page>
    </Layer>
  );
}
