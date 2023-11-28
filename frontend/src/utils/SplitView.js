import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import queryString from "query-string";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

class SplitView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handimages: [],
      typedimages: [],
    };
  }

  componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    let i = 0;
    let handimagehash = [];
    if (Array.isArray(values.handimages)) {
      while (i < values.handimages.length) {
        handimagehash.push({
          original: values.handimages[i],
          thumbnail: values.handimages[i],
        });
        i++;
      }
    } else {
      handimagehash.push({
        original: values.handimages,
        thumbnail: values.handimages,
      });
    }
    i = 0;
    let typedimagehash = [];
    if (Array.isArray(values.typedimages)) {
      while (i < values.typedimages.length) {
        typedimagehash.push({
          original: values.typedimages[i],
          thumbnail: values.typedimages[i],
        });
        i++;
      }
    } else {
      typedimagehash.push({
        original: values.typedimages,
        thumbnail: values.typedimages,
      });
    }
    this.setState({
      key: values.key,
      handimages: handimagehash,
      typedimages: typedimagehash,
    });
  }

  render() {
    const Galleries = () => (
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            <ImageGallery key={1} items={this.state.handimages} />
          </Grid.Column>
          <Grid.Column>
            <ImageGallery key={2} items={this.state.typedimages} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );

    return <Galleries />;
  }
}
export default SplitView;
