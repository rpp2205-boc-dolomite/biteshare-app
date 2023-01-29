import * as React from 'react';
import CustomSplitFriend from './CustomSplitFriend.jsx';
import {
  Box
} from '@mui/material';

export default function CustomSplit({ hidden, setFriendData, host, friends, mealTotal, evenMealAmt, tipPercent }) {
  if (hidden || !host || !friends) { return null; }

  return (<>
    <Box hidden={hidden} fullWidth sx={{ p: 1, border: '1px dashed grey' }}>
      <CustomSplitFriend name={host.name} meal={host.meal_amount} tip={host.tip_amount} setMeal={amt => setFriendData(-1, { meal_amount: amt })} setTip={amt => setFriendData(-1, { tip_amount: amt })} />
      {friends.map((friend, index) =>
        <CustomSplitFriend
          meal={friend.meal_amount}
          tip={friend.tip_amount}
          setMeal={amt => setFriendData(index, { meal_amount: amt })}
          setTip={amt => setFriendData(index, { tip_amount: amt })}
          key={index} />
      )}
    </Box>
    <Box>
        Meal total: ${mealTotal.toFixed(2)}
        Tip percentage: {(tipPercent * 100 || 0).toFixed(1)}%
    </Box>
  </>);
};