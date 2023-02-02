import * as React from 'react';
import CustomSplitFriend from './CustomSplitFriend.jsx';
import {
  Box,
  Stack
} from '@mui/material';



export default function CustomSplit({ hidden, setFriendData, host, friends, mealTotal, evenMealAmt, tipPercent }) {
  console.log(hidden, !!host, !!friends, !!mealTotal, !!evenMealAmt, !!tipPercent);
  if (hidden || !host || !friends) { return null; }

  const getCustomMealTotal = () => {
    let total = host.meal_amount;

    for (const friend of friends) {
      total += friend.meal_amount;
    }

    return total;
  };

  const getCustomTipTotal = () => {
    let total = host.tip_amount;

    for (const friend of friends) {
      total += friend.tip_amount;
    }

    return total;
  };


  return (
    <Box hidden={hidden}>
      <Stack direction="column">
        <CustomSplitFriend name={host.name} meal={host.meal_amount} tip={host.tip_amount} setMeal={amt => setFriendData(-1, { meal_amount: amt })} setTip={amt => setFriendData(-1, { tip_amount: amt })} />
        {friends.map((friend, index) =>
          <CustomSplitFriend
            meal={friend.meal_amount}
            tip={friend.tip_amount}
            setMeal={amt => setFriendData(index, { meal_amount: amt })}
            setTip={amt => setFriendData(index, { tip_amount: amt })}
            key={index} />
        )}
      </Stack>
      <Stack>
        Custom split totals:
        Meal: {getCustomMealTotal()}
        Tip: {getCustomTipTotal()}
      </Stack>
      {/* <Box>
      Meal total: ${mealTotal.toFixed(2)}
      Tip percentage: {(tipPercent * 100 || 0).toFixed(1)}%
    </Box> */}
    </Box>);
};