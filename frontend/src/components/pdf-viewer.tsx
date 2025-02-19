import { PDFViewer as ReactPDFViewer, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
})

export function PDFViewer({ children }: any) {
  return (
    <ReactPDFViewer style={{ width: "100%", height: "100%", border: "none" }}>
      {children}
    </ReactPDFViewer>
  )
}
