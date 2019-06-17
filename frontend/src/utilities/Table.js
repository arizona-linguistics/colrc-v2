import React from "react";
import styled from "styled-components";
import { Component } from "react";
import { string, bool } from "prop-types";

const Styles = styled.div`
  width: 100%;
  overflow: scroll
  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 7px;
    -webkit-box-shadow: inset 100px 0 0 ${props => props.theme.scrollbar};
  }
`;

class List extends Component {
  render() {
    return (
      <Styles
        btmHorizontal={this.props.btmHorizontal}
        style={
          this.props.btmHorizontal ? { height: this.props.bottomHeight } : null
        }
      >
        <table style={{ backgroundColor: this.props.color }}>
          <thead>
            <tr>
              <th>
                <th>Icon</th>
              </th>
              <th>thing1</th>
              <th>thing2</th>
              <th>thing3</th>
              <th>thing4</th>
              <th>thing5</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td />
              <td>FirstExample.com</td>
              <td>204.11.56.48</td>
              <td>40034</td>
              <td>02/13/17 04:25</td>
              <td>01/16/18 01:12</td>
            </tr>
            <tr>
              <td />
              <td>example.com</td>
              <td>204.11.56.48</td>
              <td>40034</td>
              <td>02/13/17 04:25</td>
              <td>01/16/18 01:12</td>
            </tr>
            <tr>
              <td />
              <td>example.com</td>
              <td>204.11.56.48</td>
              <td>40034</td>
              <td>02/13/17 04:25</td>
              <td>01/16/18 01:12</td>
            </tr>
            <tr>
              <td />
              <td>example.com</td>
              <td>204.11.56.48</td>
              <td>40034</td>
              <td>02/13/17 04:25</td>
              <td>01/16/18 01:12</td>
            </tr>
            <tr>
              <td />
              <td>example.com</td>
              <td>204.11.56.48</td>
              <td>40034</td>
              <td>02/13/17 04:25</td>
              <td>01/16/18 01:12</td>
            </tr>
            <tr>
              <td />
              <td>example.com</td>
              <td>204.11.56.48</td>
              <td>40034</td>
              <td>02/13/17 04:25</td>
              <td>01/16/18 01:12</td>
            </tr>
            <tr>
              <td />
              <td>example.com</td>
              <td>204.11.56.48</td>
              <td>40034</td>
              <td>02/13/17 04:25</td>
              <td>01/16/18 01:12</td>
            </tr>
            <tr>
              <td />
              <td>example.com</td>
              <td>204.11.56.48</td>
              <td>40034</td>
              <td>02/13/17 04:25</td>
              <td>01/16/18 01:12</td>
            </tr>
            <tr>
              <td />
              <td>example.com</td>
              <td>204.11.56.48</td>
              <td>40034</td>
              <td>02/13/17 04:25</td>
              <td>01/16/18 01:12</td>
            </tr>
            <tr>
              <td />
              <td>example.com</td>
              <td>204.11.56.48</td>
              <td>40034</td>
              <td>02/13/17 04:25</td>
              <td>01/16/18 01:12</td>
            </tr>
            <tr>
              <td />
              <td>example.com</td>
              <td>204.11.56.48</td>
              <td>40034</td>
              <td>02/13/17 04:25</td>
              <td>01/16/18 01:12</td>
            </tr>
            <tr>
              <td />
              <td>example.com</td>
              <td>204.11.56.48</td>
              <td>40034</td>
              <td>02/13/17 04:25</td>
              <td>01/16/18 01:12</td>
            </tr>
            <tr>
              <td />
              <td>example.com</td>
              <td>204.11.56.48</td>
              <td>40034</td>
              <td>02/13/17 04:25</td>
              <td>01/16/18 01:12</td>
            </tr>
            <tr>
              <td />
              <td>example.com</td>
              <td>204.11.56.48</td>
              <td>40034</td>
              <td>02/13/17 04:25</td>
              <td>01/16/18 01:12</td>
            </tr>
            <tr>
              <td />
              <td>example.com</td>
              <td>204.11.56.48</td>
              <td>40034</td>
              <td>02/13/17 04:25</td>
              <td>01/16/18 01:12</td>
            </tr>
            <tr>
              <td />
              <td>example.com</td>
              <td>204.11.56.48</td>
              <td>40034</td>
              <td>02/13/17 04:25</td>
              <td>01/16/18 01:12</td>
            </tr>
            <tr>
              <td />
              <td>example.com</td>
              <td>204.11.56.48</td>
              <td>40034</td>
              <td>02/13/17 04:25</td>
              <td>01/16/18 01:12</td>
            </tr>
            <tr>
              <td />
              <td>example.com</td>
              <td>204.11.56.48</td>
              <td>40034</td>
              <td>02/13/17 04:25</td>
              <td>01/16/18 01:12</td>
            </tr>
            <tr>
              <td />
              <td>example.com</td>
              <td>204.11.56.48</td>
              <td>40034</td>
              <td>02/13/17 04:25</td>
              <td>01/16/18 01:12</td>
            </tr>
            <tr>
              <td />
              <td>example.com</td>
              <td>204.11.56.48</td>
              <td>40034</td>
              <td>02/13/17 04:25</td>
              <td>01/16/18 01:12</td>
            </tr>
            <tr>
              <td />
              <td>example.com</td>
              <td>204.11.56.48</td>
              <td>40034</td>
              <td>02/13/17 04:25</td>
              <td>01/16/18 01:12</td>
            </tr>
            <tr>
              <td />
              <td>example.com</td>
              <td>204.11.56.48</td>
              <td>40034</td>
              <td>02/13/17 04:25</td>
              <td>01/16/18 01:12</td>
            </tr>
            <tr>
              <td />
              <td>example.com</td>
              <td>204.11.56.48</td>
              <td>40034</td>
              <td>02/13/17 04:25</td>
              <td>01/16/18 01:12</td>
            </tr>
            <tr>
              <td />
              <td>example.com</td>
              <td>204.11.56.48</td>
              <td>40034</td>
              <td>02/13/17 04:25</td>
              <td>01/16/18 01:12</td>
            </tr>
            <tr>
              <td />
              <td>example.com</td>
              <td>204.11.56.48</td>
              <td>40034</td>
              <td>02/13/17 04:25</td>
              <td>01/16/18 01:12</td>
            </tr>
            <tr>
              <td />
              <td>example.com</td>
              <td>204.11.56.48</td>
              <td>40034</td>
              <td>02/13/17 04:25</td>
              <td>01/16/18 01:12</td>
            </tr>
            <tr>
              <td />
              <td>example.com</td>
              <td>204.11.56.48</td>
              <td>40034</td>
              <td>02/13/17 04:25</td>
              <td>01/16/18 01:12</td>
            </tr>
            <tr>
              <td />
              <td>LastExample.com</td>
              <td>204.11.56.48</td>
              <td>40034</td>
              <td>02/13/17 04:25</td>
              <td>01/16/18 01:12</td>
            </tr>
          </tbody>
        </table>
      </Styles>
    );
  }
}
export default List;

List.propTypes = {
  BtcolornRef: string,
  horizontalSplit: bool,
  btmHorizontal: bool,
  bottomHeight: string
};

List.defaultProps = {
  color: "white",
  horizontalSplit: false,
  btmHorizontal: false,
  bottomHeight: "100px"
};
