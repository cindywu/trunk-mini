// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: any, res: any) => {
  res.json({
    // We will discuss these two fields in later steps.
    lastMutationID: 0,
    cookie: null,
    patch: [
      {op: 'clear'},
      {
        op: 'put',
        key: 'ref/e3969a75-813e-4d08-acee-b85b034f397c',
        value: {
          order: 1,
          abbreviation: 'Baird 1986',
          title: 'Upper cretaceous reptiles from the Severn Formation of Maryland',
        },
      },
      {
        op: 'put',
        key: 'ref/936dc48f-36e4-46f5-8e0e-32fc72324487',
        value: {
          order: 2,
          abbreviation: 'Baird and Galton 1981',
          title: 'Pterosaur bones from the upper cretaceous of Delaware',
        },
      },
    ],
  })
  res.end()
}