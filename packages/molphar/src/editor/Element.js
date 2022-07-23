import {Button} from "./elements/Button";
import {Container} from "./elements/Container";
import {Text} from "./elements/Text";
import {Input} from "./elements/Input";

export const Element = ({element}) => {
  const {type} = element;

  switch (type) {
    case 'ROOT':
      return <Container element={element}/>
    case 'container':
      return <Container element={element}/>;
    case 'text':
      return <Text element={element}/>;
    case 'button':
      return <Button element={element}/>;
    case 'input':
      return <Input element={element}/>;
    default:
      return <div className="text-red-600">Unknown element type: {type}</div>;
  }
}
