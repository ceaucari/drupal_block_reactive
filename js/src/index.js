/**
 * @file
 * Attaching React component via Drupal behaviors..
 */

import CommentBox from './components/CommentBox'

Drupal.behaviors.drupal_block_reactive = {
  attach: (context) => {
    // Render our component.
    ReactDOM.render(
      <CommentBox url='/api/comments' timeInterval={2000}/>,
      document.getElementById('recent-comments-react')
    );
  }
};
