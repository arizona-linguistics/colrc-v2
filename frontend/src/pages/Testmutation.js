import React from "react";
import { Grid, Button, Segment, Header } from "semantic-ui-react";
import { useAuth } from "../context/auth";
import { insertAffixMutation } from "../queries/queries";
import { useMutation } from "@apollo/react-hooks";

function errorCallback() {
  console.log("Something bad happened");
}

function Testmutation(props) {
  const { client } = useAuth();
  const [
    insertAffix,
    {
      data: insertAffixData,
      loading: insertAffixLoading,
      error: insertAffixError,
    },
  ] = useMutation(insertAffixMutation, {
    client: client,
    errorPolicy: "all",
    onError: errorCallback,
  });

  return (
    <Grid textAlign="center" verticalAlign="top">
      <Grid.Column style={{ maxWidth: 750 }} textAlign="center">
        <Header as="h2" textAlign="center">
          Test Mutation
        </Header>
        <Segment stacked textAlign="center">
          <Button
            color="blue"
            onClick={(e) => (
              props.history.push("/testmutation"), insertAffix()
            )}
          >
            Test on Click
          </Button>
          <div>
            {insertAffixLoading && <p>Loading...</p>}
            {insertAffixError && <p>Error :( Please try again</p>}
          </div>
        </Segment>
      </Grid.Column>
    </Grid>
  );
}

export default Testmutation;
