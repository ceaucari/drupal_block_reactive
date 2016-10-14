/**
 * @file
 * Attaching React component via Drupal behaviors..
 */

import CommentBox from './components/CommentBox'

Drupal.behaviors.drupal_block_reactive = {
  attach: (context) => {
    // Comment component.
    class Comment extends React.Component {
      render() {
        return (
          <div className="Comment">
            <span>{this.props.subject}</span> | <span>{this.props.changed}</span>
          </div>
        );
      }
    }
    // Render our component.
    ReactDOM.render(
      <CommentBox url='/api/comments' timeInterval={2000}/>,
      document.getElementById('recent-comments-react')
    );
  }
};
