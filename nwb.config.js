module.exports = nwb => ({
  // Let nwb know this is a React component module when generic build commands
  // are used.
  type: 'react-component',

  build: {
    umd: false,
    global: '',
    externals: {
      'react': 'React'
    },
    jsNext: true
  },

  webpack: {
    extra: {
      plugins: [
        new nwb.webpack.IgnorePlugin(/react\/lib\/(?:ExecutionEnvironment|ReactContext)/)
      ]
    }
  }
})
