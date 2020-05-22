import React, { useState, useEffect } from 'react';

import { Grid } from '@material-ui/core';
import { GiCrownedSkull, GiCrown, GiQueenCrown } from 'react-icons/gi';

import api from '../../services/api';
import './styles.css';


export default function TopUsers() {

  /* FETCH FOR TOP 10 */

  const [topUsers, setTopUsers] = useState([]);

  const fetchTopUsers = async () => {
    let response;
    try {
      response = await api.get('/topUsers');

      if (response.status === 200) {
        setTopUsers(response.data);
        console.log(response.data);
        
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTopUsers();
  }, []);

  return (
    <div className="rank-users">
      <Grid container justify="space-around" alignItems="center" spacing="4">
        {topUsers.map((item, index) => (
          <Grid item lg="6" sm="8" xs="12">

            <div className="top-user">
              <div className="top">
                <h1>{item.username}</h1>
                {index === 0 && <GiCrownedSkull className="badge" color="#ffdf00" size="32" />}

                {index === 1 && <GiCrown className="badge" color="#C0C0C0" size="32" />}

                {index === 2 && <GiQueenCrown className="badge" color="#cd7f32" size="32" />}
              </div>
              
              <div className="bottom">
                <h2>{item.level}</h2>
                <h2>{item.xp}</h2>
              </div>
            </div>

          </Grid>
        ))}

      </Grid>
    </div>
  );
}
