import React from 'react';


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null, hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    this.setState({
      error: error,
      errorInfo: errorInfo
    }, () => {
      logErrorToMyService(error, errorInfo);
    })

  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <>
         <h1>Something went wrong.</h1>
         <detail style={{whiteSpace: 'pre-wrap'}} >
          {this.state.error && this.state.error.toString()}
          <br />
          {this.state.errorInfo.componentStack}
         </detail>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;