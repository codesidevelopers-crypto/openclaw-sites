export const onCreateWebpackConfig = ({
  actions,
}: {
  actions: { setWebpackConfig: (config: Record<string, unknown>) => void };
}) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@": `${__dirname}/src`,
      },
    },
  });
};
