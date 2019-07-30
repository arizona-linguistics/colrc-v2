import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withApollo, graphql, compose } from 'react-apollo';
import { getAudioSetsQuery, getAudioFilesQuery } from '../queries/queries';

class AudioPlayer extends Component {
  getAudioSets = async (values, setSubmitting) => {
    console.log("get audio sets");
    console.log(values)
    console.log(setSubmitting)
    try {
      console.log("this.props.client")
      console.log(this.props.client)
        //for login, check that the email and password match user table and if they do, generate a JWT token
        const queryAudioSets = await this.props.client.query({
          query: getAudioSetsQuery,
          variables: {
            title: values.title,
            speaker: values.speaker,
            active: values.active,
            textId: values.textId
          }
        })
      } catch (result) {
        console.log(result)
      }
    }

  createAudioSources = (sources) => {

     let children = [];
     //Inner loop to create children
     let directLink = "";
     for (let i = 0; i < sources.length; i++)
     {
         children.push(<source src={sources[i].src} type={sources[i].type}></source>);
         if (sources[i].direct) {
           directLink = <a href={sources[i].src}>Access the files</a>;
         }
     }
     if (directLink !== "") {
       children.push(<p>Your browser does not support the HTML5 audio element. {directLink} directly.</p>);
     }
     return children;
   }

  render() {
    const hasTitle = this.props.title.length > 0;
    const hasSpeaker = this.props.speaker ? true : false;
    const conditionalTitle = hasTitle ? this.props.title : '';
    const title = hasSpeaker && hasTitle
    	? <p>{this.props.title}, spoken by {this.props.speaker}</p> 
    	: (hasTitle 
    		? <p>{this.props.title}</p>
    		: '');

    return (
      <div>
  		{title}
        <audio controls="controls" preload="none">
          {this.createAudioSources(this.props.sources)}
        </audio>
      </div>
    )
  }
}

export default compose(
  graphql(getAudioSetsQuery, { name: 'getAudioSetsQuery' }),
  graphql(getAudioFilesQuery, { name: 'getAudioFilesQuery' })
)(withApollo(withRouter(AudioPlayer)));