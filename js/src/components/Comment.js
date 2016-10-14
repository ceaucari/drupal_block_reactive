// Comment component.
class Comment extends React.Component {
  render() {
    return ( <div className = "Comment" ><span> {this.props.subject} < /span> | <span>{this.props.changed}</span ></div>);
  }
}

export default Comment
