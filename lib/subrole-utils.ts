import type { DosenSubRole } from "@/types/role"

/**
 * Parse user's subroles from database subRole field
 * The subRole field can contain multiple subroles separated by comma
 * Example: "dekan,wakil_dekan_1" or "prodi" or "dosen"
 */
export function parseUserSubRoles(subRoleString?: string | null): DosenSubRole[] {
  console.log('=== DEBUG parseUserSubRoles ===')
  console.log('Input subRoleString:', subRoleString)
  
  if (!subRoleString) {
    console.log('No subRoleString, returning default ["dosen"]')
    return ["dosen"] // Default to dosen only
  }

  const subRoles = subRoleString.split(",").map(role => role.trim()) as DosenSubRole[]
  console.log('Split subRoles:', subRoles)
  
  // Filter out empty strings and invalid roles
  const validSubRoles = subRoles.filter(role => role && role.length > 0)
  console.log('Valid subRoles after filtering:', validSubRoles)
  
  // If no valid subroles found, default to dosen
  if (validSubRoles.length === 0) {
    console.log('No valid subroles, returning default ["dosen"]')
    return ["dosen"]
  }
  
  // Return only the subroles that the user actually has
  // Don't automatically add "dosen" unless explicitly specified
  const availableSubRoles: DosenSubRole[] = []
  
  validSubRoles.forEach(subRole => {
    if (!availableSubRoles.includes(subRole)) {
      availableSubRoles.push(subRole)
    }
  })
  
  console.log('Available subroles before adding dosen:', availableSubRoles)
  
  // If no dosen role is specified but user has other subroles, 
  // add dosen as it's the base academic role
  if (!availableSubRoles.includes("dosen") && availableSubRoles.length > 0) {
    availableSubRoles.unshift("dosen")
    console.log('Added dosen as base role')
  }
  
  console.log('Final availableSubRoles:', availableSubRoles)
  console.log('==============================')
  return availableSubRoles
}

/**
 * Check if user has access to a specific subrole
 */
export function hasSubRoleAccess(userSubRoles: string | null | undefined, targetSubRole: DosenSubRole): boolean {
  const availableSubRoles = parseUserSubRoles(userSubRoles)
  return availableSubRoles.includes(targetSubRole)
}

/**
 * Get the default subrole for a user (highest priority subrole they have)
 */
export function getDefaultSubRole(subRoleString?: string | null): DosenSubRole {
  const availableSubRoles = parseUserSubRoles(subRoleString)
  
  // Priority order: leadership roles first, then academic roles
  const priorityOrder: DosenSubRole[] = [
    'dekan', 'wakil_dekan_1', 'wakil_dekan_2', 'wakil_dekan_3', 'wakil_dekan_4',
    'prodi', 'sekretaris_prodi', 'gkm', 'dosen'
  ]
  
  // Return the highest priority subrole that user has access to
  for (const role of priorityOrder) {
    if (availableSubRoles.includes(role)) {
      return role
    }
  }
  
  // Fallback to first available or dosen
  return availableSubRoles[0] || "dosen"
}
