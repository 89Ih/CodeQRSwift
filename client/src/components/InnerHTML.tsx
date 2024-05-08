interface InnerHTMLProps {
    Convert:  string | TrustedHTML
}
 
const InnerHTML: React.FC<InnerHTMLProps> = ({Convert}) => {return <div dangerouslySetInnerHTML={{ __html: Convert }} /> }
 
export default InnerHTML;