import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/mapped-types';
import { AdditionalCatInfo, CreateCatDto } from './create-cat.dto';

// PartialType() creates a same type with same properties, but with each one optional.
class UpdateCatDto extends PartialType(CreateCatDto) {}

// PickType() creates a type with only the specified set of properties.
class UpdateCatWithAgeDto extends PickType(CreateCatDto, ['age'] as const) {}

// OmityType() creates a type with all properties except the specified ones.
class UpdateCatWithoutNameDto extends OmitType(CreateCatDto, [
  'name',
] as const) {}

// IntersectionType() creates a type that combines all properties in both types.
class UpdateCatIntersectionDto extends IntersectionType(
  CreateCatDto,
  AdditionalCatInfo,
) {}

// Type mapping utility functions are composable
// Following type has all properties of CreateCatDto type except for name, and those properties will be set to optional.
class UpdateCatComposedDto extends PartialType(
  OmitType(CreateCatDto, ['name'] as const),
) {}

export {
  UpdateCatDto,
  UpdateCatWithAgeDto,
  UpdateCatWithoutNameDto,
  UpdateCatIntersectionDto,
  UpdateCatComposedDto,
};
