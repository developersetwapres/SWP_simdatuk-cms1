export const SaveAs = {
  PDF: 'application/pdf',
  XLS: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;',
  CSV: 'text/csv',
  ZIP: 'application/zip'
}

export const saveFile = (blob, fileName, type = SaveAs.PDF) => {
  const file = new Blob([blob], { type })
  const fileURL = URL.createObjectURL(file)
  const link = document.createElement('a')
  link.href = fileURL
  link.download = fileName
  link.click()
  URL.revokeObjectURL(fileURL)
}