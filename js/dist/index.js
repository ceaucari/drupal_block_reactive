(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Comment component.
var Comment = function (_React$Component) {
  _inherits(Comment, _React$Component);

  function Comment() {
    _classCallCheck(this, Comment);

    return _possibleConstructorReturn(this, (Comment.__proto__ || Object.getPrototypeOf(Comment)).apply(this, arguments));
  }

  _createClass(Comment, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "Comment" },
        React.createElement(
          "span",
          null,
          " ",
          this.props.subject,
          " "
        ),
        " | ",
        React.createElement(
          "span",
          null,
          this.props.changed
        )
      );
    }
  }]);

  return Comment;
}(React.Component);

exports.default = Comment;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Comment = require('./Comment');

var _Comment2 = _interopRequireDefault(_Comment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// CommentBox component.
var CommentBox = function (_React$Component) {
  _inherits(CommentBox, _React$Component);

  function CommentBox() {
    _classCallCheck(this, CommentBox);

    // Setting initial state.
    var _this = _possibleConstructorReturn(this, (CommentBox.__proto__ || Object.getPrototypeOf(CommentBox)).call(this));

    _this.state = {
      comments: []
    };
    return _this;
  }
  // Data from a service.


  _createClass(CommentBox, [{
    key: '_fetchData',
    value: function _fetchData() {
      var _this2 = this;

      jQuery.ajax({
        url: this.props.url,
        dataType: 'json',
        success: function success(comments) {
          return _this2.setState({
            comments: comments
          });
        },
        error: function error(xhr, status, err) {
          console.error(_this2.props.url, status, err.toString());
        }
      });
    }
    // Gets data from state, returns a list components.

  }, {
    key: '_getComments',
    value: function _getComments() {
      // Get the list of comments from the state.
      var commentsList = this.state.comments;
      // Return an array of sub-components.
      if (commentsList.length > 0) {
        return commentsList.map(function (comment) {
          return React.createElement(_Comment2.default, { subject: comment.subject, changed: comment.changed, key: comment.cid });
        });
      }
      return React.createElement(
        'p',
        null,
        ' ',
        Drupal.t('No comments.'),
        ' '
      );
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._fetchData();
      setInterval(this._fetchData.bind(this), this.props.timeInterval);
    }
  }, {
    key: 'render',
    value: function render() {
      var commentsNodes = this._getComments();
      return React.createElement(
        'div',
        { className: 'CommentBox' },
        ' ',
        commentsNodes,
        ' '
      );
    }
  }]);

  return CommentBox;
}(React.Component);

exports.default = CommentBox;

},{"./Comment":1}],3:[function(require,module,exports){
'use strict';

var _CommentBox = require('./components/CommentBox');

var _CommentBox2 = _interopRequireDefault(_CommentBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Drupal.behaviors.drupal_block_reactive = {
  attach: function attach(context) {
    // Render our component.
    ReactDOM.render(React.createElement(_CommentBox2.default, { url: '/api/comments', timeInterval: 2000 }), document.getElementById('recent-comments-react'));
  }
}; /**
    * @file
    * Attaching React component via Drupal behaviors..
    */

},{"./components/CommentBox":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29tcG9uZW50cy9Db21tZW50LmpzIiwic3JjL2NvbXBvbmVudHMvQ29tbWVudEJveC5qcyIsInNyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7SUFDTSxPOzs7Ozs7Ozs7Ozs2QkFDSztBQUNQLGFBQVM7QUFBQTtBQUFBLFVBQUssV0FBWSxTQUFqQjtBQUE0QjtBQUFBO0FBQUE7QUFBQTtBQUFRLGVBQUssS0FBTCxDQUFXLE9BQW5CO0FBQUE7QUFBQSxTQUE1QjtBQUFBO0FBQW1FO0FBQUE7QUFBQTtBQUFPLGVBQUssS0FBTCxDQUFXO0FBQWxCO0FBQW5FLE9BQVQ7QUFDRDs7OztFQUhtQixNQUFNLFM7O2tCQU1iLE87Ozs7Ozs7Ozs7O0FDUGY7Ozs7Ozs7Ozs7OztBQUVBO0lBQ00sVTs7O0FBQ0osd0JBQWM7QUFBQTs7QUFFVjtBQUZVOztBQUdWLFVBQUssS0FBTCxHQUFhO0FBQ1gsZ0JBQVU7QUFEQyxLQUFiO0FBSFU7QUFNWDtBQUNEOzs7OztpQ0FDVztBQUFBOztBQUNULGFBQU8sSUFBUCxDQUFZO0FBQ1YsYUFBSyxLQUFLLEtBQUwsQ0FBVyxHQUROO0FBRVYsa0JBQVUsTUFGQTtBQUdWLGlCQUFTLGlCQUFDLFFBQUQ7QUFBQSxpQkFBYyxPQUFLLFFBQUwsQ0FBYztBQUNuQztBQURtQyxXQUFkLENBQWQ7QUFBQSxTQUhDO0FBTVYsZUFBTyxlQUFDLEdBQUQsRUFBTSxNQUFOLEVBQWMsR0FBZCxFQUFzQjtBQUMzQixrQkFBUSxLQUFSLENBQWMsT0FBSyxLQUFMLENBQVcsR0FBekIsRUFBOEIsTUFBOUIsRUFBc0MsSUFBSSxRQUFKLEVBQXRDO0FBQ0Q7QUFSUyxPQUFaO0FBVUQ7QUFDRDs7OzttQ0FDYTtBQUNiO0FBQ0EsVUFBTSxlQUFlLEtBQUssS0FBTCxDQUFXLFFBQWhDO0FBQ0E7QUFDQSxVQUFJLGFBQWEsTUFBYixHQUFzQixDQUExQixFQUE2QjtBQUMzQixlQUFPLGFBQWEsR0FBYixDQUFpQixVQUFDLE9BQUQsRUFBYTtBQUNuQyxpQkFBTyx5Q0FBUyxTQUFXLFFBQVEsT0FBNUIsRUFBcUMsU0FBVyxRQUFRLE9BQXhELEVBQWlFLEtBQU8sUUFBUSxHQUFoRixHQUFQO0FBQ0QsU0FGTSxDQUFQO0FBR0Q7QUFDRCxhQUFTO0FBQUE7QUFBQTtBQUFBO0FBQUssZUFBTyxDQUFQLENBQVMsY0FBVCxDQUFMO0FBQUE7QUFBQSxPQUFUO0FBRUQ7Ozt3Q0FDbUI7QUFDbEIsV0FBSyxVQUFMO0FBQ0Esa0JBQVksS0FBSyxVQUFMLENBQWdCLElBQWhCLENBQXFCLElBQXJCLENBQVosRUFBd0MsS0FBSyxLQUFMLENBQVcsWUFBbkQ7QUFDRDs7OzZCQUNRO0FBQ1AsVUFBTSxnQkFBZ0IsS0FBSyxZQUFMLEVBQXRCO0FBQ0EsYUFBUztBQUFBO0FBQUEsVUFBSyxXQUFZLFlBQWpCO0FBQUE7QUFBaUMscUJBQWpDO0FBQUE7QUFBQSxPQUFUO0FBRUQ7Ozs7RUExQ3NCLE1BQU0sUzs7a0JBNkNoQixVOzs7OztBQzNDZjs7Ozs7O0FBRUEsT0FBTyxTQUFQLENBQWlCLHFCQUFqQixHQUF5QztBQUN2QyxVQUFRLGdCQUFDLE9BQUQsRUFBYTtBQUNuQjtBQUNBLGFBQVMsTUFBVCxDQUNFLDRDQUFZLEtBQUksZUFBaEIsRUFBZ0MsY0FBYyxJQUE5QyxHQURGLEVBRUUsU0FBUyxjQUFULENBQXdCLHVCQUF4QixDQUZGO0FBSUQ7QUFQc0MsQ0FBekMsQyxDQVBBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIENvbW1lbnQgY29tcG9uZW50LlxuY2xhc3MgQ29tbWVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKCA8ZGl2IGNsYXNzTmFtZSA9IFwiQ29tbWVudFwiID48c3Bhbj4ge3RoaXMucHJvcHMuc3ViamVjdH0gPCAvc3Bhbj4gfCA8c3Bhbj57dGhpcy5wcm9wcy5jaGFuZ2VkfTwvc3BhbiA+PC9kaXY+KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb21tZW50IiwiaW1wb3J0IENvbW1lbnQgZnJvbSAnLi9Db21tZW50J1xuXG4vLyBDb21tZW50Qm94IGNvbXBvbmVudC5cbmNsYXNzIENvbW1lbnRCb3ggZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHN1cGVyKCk7XG4gICAgICAvLyBTZXR0aW5nIGluaXRpYWwgc3RhdGUuXG4gICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICBjb21tZW50czogW11cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gRGF0YSBmcm9tIGEgc2VydmljZS5cbiAgX2ZldGNoRGF0YSgpIHtcbiAgICAgIGpRdWVyeS5hamF4KHtcbiAgICAgICAgdXJsOiB0aGlzLnByb3BzLnVybCxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgc3VjY2VzczogKGNvbW1lbnRzKSA9PiB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBjb21tZW50c1xuICAgICAgICB9KSxcbiAgICAgICAgZXJyb3I6ICh4aHIsIHN0YXR1cywgZXJyKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcih0aGlzLnByb3BzLnVybCwgc3RhdHVzLCBlcnIudG9TdHJpbmcoKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBHZXRzIGRhdGEgZnJvbSBzdGF0ZSwgcmV0dXJucyBhIGxpc3QgY29tcG9uZW50cy5cbiAgX2dldENvbW1lbnRzKCkge1xuICAgIC8vIEdldCB0aGUgbGlzdCBvZiBjb21tZW50cyBmcm9tIHRoZSBzdGF0ZS5cbiAgICBjb25zdCBjb21tZW50c0xpc3QgPSB0aGlzLnN0YXRlLmNvbW1lbnRzO1xuICAgIC8vIFJldHVybiBhbiBhcnJheSBvZiBzdWItY29tcG9uZW50cy5cbiAgICBpZiAoY29tbWVudHNMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiBjb21tZW50c0xpc3QubWFwKChjb21tZW50KSA9PiB7XG4gICAgICAgIHJldHVybiA8Q29tbWVudCBzdWJqZWN0ID0ge2NvbW1lbnQuc3ViamVjdH0gY2hhbmdlZCA9IHtjb21tZW50LmNoYW5nZWR9IGtleSA9IHtjb21tZW50LmNpZH0vPlxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiAoIDxwPiB7RHJ1cGFsLnQoJ05vIGNvbW1lbnRzLicpfSA8L3A+XG4gICAgKTtcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLl9mZXRjaERhdGEoKTtcbiAgICBzZXRJbnRlcnZhbCh0aGlzLl9mZXRjaERhdGEuYmluZCh0aGlzKSwgdGhpcy5wcm9wcy50aW1lSW50ZXJ2YWwpO1xuICB9XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBjb21tZW50c05vZGVzID0gdGhpcy5fZ2V0Q29tbWVudHMoKTtcbiAgICByZXR1cm4gKCA8ZGl2IGNsYXNzTmFtZSA9IFwiQ29tbWVudEJveFwiID4ge2NvbW1lbnRzTm9kZXN9IDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29tbWVudEJveFxuIiwiLyoqXG4gKiBAZmlsZVxuICogQXR0YWNoaW5nIFJlYWN0IGNvbXBvbmVudCB2aWEgRHJ1cGFsIGJlaGF2aW9ycy4uXG4gKi9cblxuaW1wb3J0IENvbW1lbnRCb3ggZnJvbSAnLi9jb21wb25lbnRzL0NvbW1lbnRCb3gnXG5cbkRydXBhbC5iZWhhdmlvcnMuZHJ1cGFsX2Jsb2NrX3JlYWN0aXZlID0ge1xuICBhdHRhY2g6IChjb250ZXh0KSA9PiB7XG4gICAgLy8gUmVuZGVyIG91ciBjb21wb25lbnQuXG4gICAgUmVhY3RET00ucmVuZGVyKFxuICAgICAgPENvbW1lbnRCb3ggdXJsPScvYXBpL2NvbW1lbnRzJyB0aW1lSW50ZXJ2YWw9ezIwMDB9Lz4sXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVjZW50LWNvbW1lbnRzLXJlYWN0JylcbiAgICApO1xuICB9XG59O1xuIl19
