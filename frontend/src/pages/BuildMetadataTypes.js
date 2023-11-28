import React from "react";
import {
  Grid,
  Header,
  Dropdown,
  Segment,
  Button,
  Table,
  Input,
  Checkbox,
} from "semantic-ui-react";

function BuildMetadataType(props) {
  return (
    <>
      <Grid textAlign="center" verticalAlign="top">
        <Grid.Column style={{ maxWidth: 750 }} textAlign="center">
          <Grid.Row>
            <Segment>
              <Header as="h3">Resource Type: Workbook</Header>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Type</Table.HeaderCell>
                    <Table.HeaderCell>Required</Table.HeaderCell>
                    <Table.HeaderCell>Array</Table.HeaderCell>
                    <Table.HeaderCell>Validation</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <Button color="blue">delete</Button>
                    </Table.Cell>
                    <Table.Cell>Description</Table.Cell>
                    <Table.Cell>text</Table.Cell>
                    <Table.Cell>✅</Table.Cell>
                    <Table.Cell>❌</Table.Cell>
                    <Table.Cell>MaxLength = 500, MinLength = 3</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Button color="blue">delete</Button>
                    </Table.Cell>
                    <Table.Cell>ISBN</Table.Cell>
                    <Table.Cell>text</Table.Cell>
                    <Table.Cell>❌</Table.Cell>
                    <Table.Cell>❌</Table.Cell>
                    <Table.Cell>XXX-XXX-XXX-XX</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Button color="blue">delete</Button>
                    </Table.Cell>
                    <Table.Cell>Coverage Language</Table.Cell>
                    <Table.Cell>code</Table.Cell>
                    <Table.Cell>✅</Table.Cell>
                    <Table.Cell>✅</Table.Cell>
                    <Table.Cell>code table = langCodes</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <Button color="black">add</Button>
                    </Table.Cell>
                    <Table.Cell>
                      <Input />
                    </Table.Cell>
                    <Table.Cell>
                      <Dropdown
                        id="type"
                        placeholder="Select a type"
                        fluid
                        options={[
                          { key: "text", text: "text", value: "text" },
                          { key: "code", text: "code", value: "code" },
                          { key: "date", text: "date", value: "date" },
                        ]}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Checkbox />
                    </Table.Cell>
                    <Table.Cell>
                      <Checkbox />
                    </Table.Cell>
                    <Table.Cell>
                      <Dropdown
                        id="validation"
                        placeholder="Select a validation type"
                        fluid
                        multiple
                        options={[
                          {
                            key: "MinLength",
                            text: "MinLength",
                            value: "MinLength",
                          },
                          {
                            key: "MaxLength",
                            text: "MaxLength",
                            value: "MaxLength",
                          },
                          {
                            key: "YY-YY",
                            text: "Date Range: YY-YY",
                            value: "YY-YY",
                          },
                        ]}
                      />
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Segment>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    </>
  );
}

export default BuildMetadataType;
