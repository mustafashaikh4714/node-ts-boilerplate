const cleanDoc = () => {
  return {
    transform(_: any, doc: any) {
      doc.id = doc._id
      delete doc._id
      delete doc.__v

      if (doc.hasOwnProperty('password')) {
        delete doc.password
      }
    }
  }
}

export default cleanDoc
