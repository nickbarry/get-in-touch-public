'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import messages from './messages';
import styles from './styles.css';
import { List, Map } from 'immutable';
import { Button } from 'react-bootstrap';
import { requestContactDeletion } from './actions';
export class ContactCard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const storiesGroupedByTopic = this.props.stories
      // .filter(story => !this.props.contact.get('storiesDone').includes(story.get('id')))
      .sortBy((story) => story.get('topic'))
      .reduce((groupsOfTopics, story) => {
        const topic = story.get('topic');
        const lastGroup = groupsOfTopics.last(); // should be a Map, or undefined if this is the first story
        // defined and not used? ---> const needToCreateNewGrouping = (lastGroup === undefined) || (lastGroup.get('topic') !== topic);

        // If we need to create a new topic grouping for this current story:
        if ((lastGroup === undefined) || (lastGroup.get('topic') !== story.get('topic'))) {
          // Create a new grouping of topics
          const newGroup = Map({ // eslint-disable-line
            topic,
            stories: List([story]), // eslint-disable-line
          });

          // Add the new topic grouping to the list of topics
          return groupsOfTopics.push(newGroup);
        }
        // Otherwise, we'll add this story to the existing final grouping of topics
        const lastGroupStories = lastGroup.get('stories');
        const updatedGroup = lastGroup.set('stories', lastGroupStories.push(story));
        return groupsOfTopics.set(-1, updatedGroup);
      }, List()); // eslint-disable-line

    return (
      <div className={styles.contactCard}>
        <h3>
          {this.props.contact.get('name')}
          <button className={styles.btnContacted}>Just contacted!</button>
        </h3>
        <Button className={styles.btnEdit}>Edit</Button>
        <Button className={styles.btnDelete}
                onClick={ () => this.props.requestContactDeletion(this.props.contact.get('id')) }
        >
          Delete
        </Button>
        <p className={styles.stats}>
          Contacted { this.props.contact.get('lastContacted').format('MMM D, YYYY') }.
          Contact every { this.props.contact.get('contactFrequency') } days
        </p>
        <label className={styles.composeLabel} htmlFor={`notes-chk-${this.props.contact.get('id')}`}>Message {this.props.contact.name}</label>
        <input type="checkbox" id={`notes-chk-${this.props.contact.get('id')}`} />
        <div className={styles.notesAndCompose}>
          <div className={styles.notes}>
            <h4>Notes</h4>
            <textarea name="contact--notes--edit" rows="10" defaultValue={this.props.contact.get('notes')} />
          </div>
          <div className={styles.compose}>
            <h4>Compose a message</h4>
            <select>
              <option value="">-- share a story --</option>
              {
                storiesGroupedByTopic
                  .map((topicGroup, i) => (
                    <optgroup key={i} label={topicGroup.get('topic')}>
                      {
                        topicGroup.get('stories')
                          .map((story, i) => ( // eslint-disable-line
                            <option key={i} value={story.get('id')}>{story.get('title')}</option>
                          ))
                          .toArray()
                      }
                    </optgroup>
                  ))
              }
            </select><br />
            <textarea rows="10" />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const stories = state.get('stories');
  return { stories };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ requestContactDeletion }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactCard);
