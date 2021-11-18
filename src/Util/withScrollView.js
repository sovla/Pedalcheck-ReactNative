export default function withScrollView(WrappedComponent) {
  return props => {
    return <WrappedComponent {...props} />;
  };
}
