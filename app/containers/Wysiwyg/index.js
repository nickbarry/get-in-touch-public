import React from 'react';
import { connect } from 'react-redux';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { bindActionCreators } from 'redux';
// import styles from './styles.css';

export class Wysiwyg extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = (editorState) => this.setState({ editorState });
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this._onBoldClick = this._onBoldClick.bind(this);
    this.assignEditorRef = (c) => { this.editor = c; };
  }

  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));

    // Todo: This (below) seems hacky. There must be a better way to do it.
    // If I don't put it inside setImmediate, then for some reason it prevents the BOLD change from applying.
    // Removing the line below entirely takes focus away from the editor, which is annoying
    window.setImmediate(() => this.editor.focus());
  }

  render() {
    return (
      <div>
        <button onClick={this._onBoldClick}>Bold</button>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          handleKeyCommand={this.handleKeyCommand}
          ref={this.assignEditorRef}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { state };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { /* list actions here */ },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Wysiwyg);
