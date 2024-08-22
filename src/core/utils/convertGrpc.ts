export function base64ToHex(str) {
  const raw = atob(str);
  let result = '';
  for (let i = 0; i < raw.length; i++) {
    const hex = raw.charCodeAt(i).toString(16);
    result += hex.length === 2 ? hex : '0' + hex;
  }
  return result.toLocaleLowerCase();
}

export function base64ToDecimal(encodedString) {
  // Convert base 64 encoded string to text
  const text = atob(encodedString);
  const decimalArray = [];

  // Run a loop on all characters of the text and convert each character to decimal
  for (let i = 0; i < text.length; i++) {
    decimalArray.push(text.charAt(i).charCodeAt(0));
  }

  // Join all decimals to get the final decimal for the entire string
  return parseInt(decimalArray.join(''));
}

export function byteToHex(str) {
  return str.map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

export function byteToDecimal(encodedString) {
  return Number(encodedString.map((byte) => byte.toString(10)).join(''));
}

export const convertMessage = (message) => {
  const data = message.Models[0].Children;
  switch (message.Models[0].Name) {
    case 'ScoutInfo': {
      return {
        event: 'ScoutInfo',
        map_id: data.find((it) => it.Name == 'map_id').Ty.Primitive.Value
          .UintValue,
        scout_id:
          '0x' +
          base64ToHex(
            data.find((it) => it.Name == 'scout_id').Ty.Primitive.Value
              .ByteValue,
          ),
        player:
          '0x' +
          base64ToHex(
            data.find((it) => it.Name == 'player').Ty.Primitive.Value.ByteValue,
          ),
        destination: {
          x: data.find((it) => it.Name == 'destination').Ty.Struct.Children[0]
            .Ty.Primitive.Value.UintValue,
          y: data.find((it) => it.Name == 'destination').Ty.Struct.Children[1]
            .Ty.Primitive.Value.UintValue,
        },
        time: data.find((it) => it.Name == 'time').Ty.Primitive.Value.UintValue,
        points_earned: data.find((it) => it.Name == 'points_earned').Ty
          .Primitive.Value.UintValue,
        has_island: data.find((it) => it.Name == 'has_island').Ty.Enum.Option,
        island_id: data.find((it) => it.Name == 'island_id').Ty.Primitive.Value
          .UintValue,
        owner:
          '0x' +
          base64ToHex(
            data.find((it) => it.Name == 'owner').Ty.Primitive.Value.ByteValue,
          ),
        position: {
          x: data.find((it) => it.Name == 'position').Ty.Struct.Children[0].Ty
            .Primitive.Value.UintValue,
          y: data.find((it) => it.Name == 'position').Ty.Struct.Children[1].Ty
            .Primitive.Value.UintValue,
        },
        block_id: data.find((it) => it.Name == 'block_id').Ty.Primitive.Value
          .UintValue,
        element: data.find((it) => it.Name == 'element').Ty.Enum.Option,
        title: data.find((it) => it.Name == 'title').Ty.Enum.optionsList[
          data.find((it) => it.Name == 'title').Ty.Enum.Option
        ].Name,
        island_type: data.find((it) => it.Name == 'island_type').Ty.Enum.Option,
        level: data.find((it) => it.Name == 'level').Ty.Primitive.Value
          .UintValue,
        max_resources: {
          food: data.find((it) => it.Name == 'max_resources').Ty.Struct
            .Children[0].Ty.Primitive.Value.UintValue,
          stone: data.find((it) => it.Name == 'max_resources').Ty.Struct
            .Children[1].Ty.Primitive.Value.UintValue,
        },
        cur_resources: {
          food: data.find((it) => it.Name == 'cur_resources').Ty.Struct
            .Children[0].Ty.Primitive.Value.UintValue,
          stone: data.find((it) => it.Name == 'cur_resources').Ty.Struct
            .Children[1].Ty.Primitive.Value.UintValue,
        },
        resources_per_claim: {
          food: data.find((it) => it.Name == 'resources_per_claim').Ty.Struct
            .Children[0].Ty.Primitive.Value.UintValue,
          stone: data.find((it) => it.Name == 'resources_per_claim').Ty.Struct
            .Children[1].Ty.Primitive.Value.UintValue,
        },
        claim_waiting_time: data.find((it) => it.Name == 'claim_waiting_time')
          .Ty.Primitive.Value.UintValue,
        resources_claim_type: data.find(
          (it) => it.Name == 'resources_claim_type',
        ).Ty.Enum.Option,
        last_resources_claim: data.find(
          (it) => it.Name == 'last_resources_claim',
        ).Ty.Primitive.Value.UintValue,
      };
    }
    case 'Journey': {
      return {
        event: 'Journey',
        map_id: data.find((it) => it.Name == 'map_id').Ty.Primitive.Value
          .UintValue,
        journey_id:
          '0x' +
          base64ToHex(
            data.find((it) => it.Name == 'journey_id').Ty.Primitive.Value
              .ByteValue,
          ),
        dragon_token_id: base64ToDecimal(
          data.find((it) => it.Name == 'dragon_token_id').Ty.Primitive.Value
            .ByteValue,
        ),
        dragon_model_id:
          '0x' +
          base64ToHex(
            data.find((it) => it.Name == 'dragon_model_id').Ty.Primitive.Value
              .ByteValue,
          ),
        owner:
          '0x' +
          base64ToHex(
            data.find((it) => it.Name == 'owner').Ty.Primitive.Value.ByteValue,
          ),
        carrying_resources: {
          food: data.find((it) => it.Name == 'carrying_resources').Ty.Struct
            .Children[0].Ty.Primitive.Value.UintValue,
          stone: data.find((it) => it.Name == 'carrying_resources').Ty.Struct
            .Children[1].Ty.Primitive.Value.UintValue,
        },
        island_from_id: data.find((it) => it.Name == 'island_from_id').Ty
          .Primitive.Value.UintValue,
        island_from_position: {
          x: data.find((it) => it.Name == 'island_from_position').Ty.Struct
            .Children[0].Ty.Primitive.Value.UintValue,
          y: data.find((it) => it.Name == 'island_from_position').Ty.Struct
            .Children[1].Ty.Primitive.Value.UintValue,
        },
        island_from_owner:
          '0x' +
          base64ToHex(
            data.find((it) => it.Name == 'island_from_owner').Ty.Primitive.Value
              .ByteValue,
          ),
        island_to_id: data.find((it) => it.Name == 'island_to_id').Ty.Primitive
          .Value.UintValue,
        island_to_position: {
          x: data.find((it) => it.Name == 'island_to_position').Ty.Struct
            .Children[0].Ty.Primitive.Value.UintValue,
          y: data.find((it) => it.Name == 'island_to_position').Ty.Struct
            .Children[1].Ty.Primitive.Value.UintValue,
        },
        island_to_owner:
          '0x' +
          base64ToHex(
            data.find((it) => it.Name == 'island_to_owner').Ty.Primitive.Value
              .ByteValue,
          ),
        start_time: data.find((it) => it.Name == 'start_time').Ty.Primitive
          .Value.UintValue,
        finish_time: data.find((it) => it.Name == 'finish_time').Ty.Primitive
          .Value.UintValue,
        attack_type: data.find((it) => it.Name == 'attack_type').Ty.Enum.Option,
        attack_result: data.find((it) => it.Name == 'attack_result').Ty.Enum
          .Option,
        status: data.find((it) => it.Name == 'status').Ty.Enum.Option,
      };
    }
    case 'Island': {
      return {
        event: 'Island',
        map_id: data.find((it) => it.Name == 'map_id').Ty.Primitive.Value
          .UintValue,
        island_id: data.find((it) => it.Name == 'island_id').Ty.Primitive.Value
          .UintValue,
        owner:
          '0x' +
          base64ToHex(
            data.find((it) => it.Name == 'owner').Ty.Primitive.Value.ByteValue,
          ),
        position: {
          x: data.find((it) => it.Name == 'position').Ty.Struct.Children[0].Ty
            .Primitive.Value.UintValue,
          y: data.find((it) => it.Name == 'position').Ty.Struct.Children[1].Ty
            .Primitive.Value.UintValue,
        },
        block_id: data.find((it) => it.Name == 'block_id').Ty.Primitive.Value
          .UintValue,
        element: data.find((it) => it.Name == 'element').Ty.Enum.Option,
        title: data.find((it) => it.Name == 'title').Ty.Enum.optionsList[
          data.find((it) => it.Name == 'title').Ty.Enum.Option
        ].Name,
        island_type: data.find((it) => it.Name == 'island_type').Ty.Enum.Option,
        level: data.find((it) => it.Name == 'level').Ty.Primitive.Value
          .UintValue,
        max_resources: {
          food: data.find((it) => it.Name == 'max_resources').Ty.Struct
            .Children[0].Ty.Primitive.Value.UintValue,
          stone: data.find((it) => it.Name == 'max_resources').Ty.Struct
            .Children[1].Ty.Primitive.Value.UintValue,
        },
        cur_resources: {
          food: data.find((it) => it.Name == 'cur_resources').Ty.Struct
            .Children[0].Ty.Primitive.Value.UintValue,
          stone: data.find((it) => it.Name == 'cur_resources').Ty.Struct
            .Children[1].Ty.Primitive.Value.UintValue,
        },
        resources_per_claim: {
          food: data.find((it) => it.Name == 'resources_per_claim').Ty.Struct
            .Children[0].Ty.Primitive.Value.UintValue,
          stone: data.find((it) => it.Name == 'resources_per_claim').Ty.Struct
            .Children[1].Ty.Primitive.Value.UintValue,
        },
        claim_waiting_time: data.find((it) => it.Name == 'claim_waiting_time')
          .Ty.Primitive.Value.UintValue,
        resources_claim_type: data.find(
          (it) => it.Name == 'resources_claim_type',
        ).Ty.Enum.Option,
        last_resources_claim: data.find(
          (it) => it.Name == 'last_resources_claim',
        ).Ty.Primitive.Value.UintValue,
      };
    }
    case 'Dragon': {
      return {
        event: 'Dragon',
        dragon_token_id: base64ToDecimal(
          data.find((it) => it.Name == 'dragon_token_id').Ty.Primitive.Value
            .ByteValue,
        ),
        model_id:
          '0x' +
          base64ToHex(
            data.find((it) => it.Name == 'model_id').Ty.Primitive.Value
              .ByteValue,
          ),
        map_id: data.find((it) => it.Name == 'map_id').Ty.Primitive.Value
          .UintValue,
        owner:
          '0x' +
          base64ToHex(
            data.find((it) => it.Name == 'owner').Ty.Primitive.Value.ByteValue,
          ),
        root_owner:
          '0x' +
          base64ToHex(
            data.find((it) => it.Name == 'root_owner').Ty.Primitive.Value
              .ByteValue,
          ),
        bg_id:
          '0x' +
          base64ToHex(
            data.find((it) => it.Name == 'bg_id').Ty.Primitive.Value.ByteValue,
          ),
        rarity: data.find((it) => it.Name == 'rarity').Ty.Enum.Option,
        element: data.find((it) => it.Name == 'element').Ty.Enum.Option,
        speed: data.find((it) => it.Name == 'speed').Ty.Primitive.Value
          .UintValue,
        attack: data.find((it) => it.Name == 'attack').Ty.Primitive.Value
          .UintValue,
        carrying_capacity: data.find((it) => it.Name == 'carrying_capacity').Ty
          .Primitive.Value.UintValue,
        state: data.find((it) => it.Name == 'state').Ty.Enum.Option,
        dragon_type: data.find((it) => it.Name == 'dragon_type').Ty.Enum.Option,
      };
    }
  }
};
